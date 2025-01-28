import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import serverApi from "Services/httpService";
import { useParams } from "react-router-dom";
import { successMessage, errorMessage } from "Utils/commonFunctions";

const fetchPermissions = async () => {
  const response = await serverApi.get("/Permission/GetAllPermissions");
  return response.data;
};

const submitPermissions = async (selectedRoutes: string[]) => {
  const data = selectedRoutes;
  return await serverApi.post("/Permission/EditPermission", selectedRoutes);
};

const fetchUserPermissions = async (userId: string) => {
  const response = await serverApi.get(`Permission/GetUserPermissions?userId=${userId}`);
  return response.data; // Assuming the response contains an array of routes
};

function Permissions() {
  const queryClient = useQueryClient();
  const parentRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, boolean>>({});
  const params = useParams();
  const userId = params?.id;

  const { data: permissionsData, isLoading } = useQuery(["permissions"], fetchPermissions, {
    onSuccess: data => {
      // Set initial preselected checkboxes based on the permissions data
      const initialCheckboxState = data.reduce((acc: Record<string, boolean>, item: any) => {
        item?.actions.forEach((action: any) => {
          acc[action.route] = preselectedRoutes?.includes(action.route);
        });
        return acc;
      }, {});
      setSelectedCheckboxes(initialCheckboxState);
    },
  });

  const mutation = useMutation(submitPermissions, {
    onSuccess: () => {
      queryClient.invalidateQueries(["permissions"]);
      queryClient.invalidateQueries(["userPermissions"]);
      successMessage("عملیات با موفقیت انجام شد");
    },
    onError: error => {
      console.error("Failed to submit permissions:", error);
      errorMessage("عملیات با خطا مواجه شد");
    },
  });

  const { data: userPermissions, isLoading: isUserPermissionsLoading } = useQuery({
    queryKey: ["userPermissions", userId],
    queryFn: () => fetchUserPermissions(userId),
    onSuccess: data => {
      console.log("Fetched user permissions:", data);
    },
    onError: error => {
      console.error("Error fetching user permissions:", error);
    },
  });

  const preselectedRoutes = userPermissions?.data;

  useEffect(() => {
    if (preselectedRoutes) {
      const initialCheckboxState = permissionsData?.reduce(
        (acc: Record<string, boolean>, item: any) => {
          item?.actions.forEach((action: any) => {
            acc[action.route] = preselectedRoutes.includes(action.route);
          });
          return acc;
        },
        {}
      );
      setSelectedCheckboxes(initialCheckboxState);
    }
  }, [preselectedRoutes, permissionsData]);

  const toggleExpand = (title: string) => {
    setExpanded(prev =>
      prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
    );
  };

  const handleParentCheckboxChange = (title: string, isChecked: boolean) => {
    const newSelectedCheckboxes = { ...selectedCheckboxes };
    const parentAndChildrenKeys = [
      title,
      ...(permissionsData
        .find((item: any) => item.title === title)
        ?.actions.map((action: any) => action.route) || []),
    ];
    parentAndChildrenKeys.forEach(key => {
      newSelectedCheckboxes[key] = isChecked;
    });
    setSelectedCheckboxes(newSelectedCheckboxes);
  };

  const handleChildCheckboxChange = (route: string, isChecked: boolean) => {
    setSelectedCheckboxes({
      ...selectedCheckboxes,
      [route]: isChecked,
    });
  };

  const { id } = useParams();
  const submit = () => {
    const selectedRoutes = Object.keys(selectedCheckboxes).filter(
      route => selectedCheckboxes[route]
    );
    const userPermission = {
      userId: id,
      permissions: selectedRoutes,
    };
    mutation.mutate(userPermission);
  };

  if (isLoading || isUserPermissionsLoading) {
    return <div>Loading permissions...</div>;
  }

  return (
    <Col>
      <AccessLabel>دسترسی:</AccessLabel>
      <Row>
        {permissionsData?.map((item: any) => (
          <div key={item.title}>
            <ParentItem onClick={() => toggleExpand(item.title)}>
              <ParentCheckbox
                type="checkbox"
                ref={el => (parentRefs.current[item.title] = el)}
                checked={
                  item?.actions?.every((action: any) => selectedCheckboxes[action.route]) &&
                  item?.actions?.length > 0
                }
                onChange={e => handleParentCheckboxChange(item.title, e.target.checked)}
              />
              <ParentText>{item.displayName}</ParentText>
              <ExpandIcon>{expanded.includes(item.title) ? "🔽" : "◀️"}</ExpandIcon>
            </ParentItem>

            {expanded.includes(item.title) && (
              <ChildItemsContainer>
                {item?.actions.map((action: any) => (
                  <ChildItem key={action.name}>
                    <ChildCheckbox
                      type="checkbox"
                      checked={!!selectedCheckboxes[action.route]}
                      onChange={e => handleChildCheckboxChange(action.route, e.target.checked)}
                    />
                    <ChildText>{action.displayName}</ChildText>
                  </ChildItem>
                ))}
              </ChildItemsContainer>
            )}
          </div>
        ))}
      </Row>
      <Button className="col-3 input-effect" style={{ width: "10vw" }} onClick={submit}>
        ثبت
      </Button>
    </Col>
  );
}

export default Permissions;

// Styled Components

// Styled Components
const Col = styled.div`
  width: 25%;
  border: 2px solid red;
`;
const Row = styled.div`
  display: grid;
  grid-template-column: 1fr 1fr 1fr;
`;

const ParentItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;
`;

const ParentCheckbox = styled.input`
  margin-right: 8px;
`;

const ParentText = styled.span`
  font-weight: bold;
`;

const ExpandIcon = styled.span`
  margin-left: auto;
`;

const ChildItemsContainer = styled.div`
  padding-left: 24px;
  margin-top: 8px;
`;

const ChildItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ChildCheckbox = styled.input`
  margin-right: 8px;
`;

const ChildText = styled.span``;

const AccessLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  display: block;
  margin: 4px;
  text-align: right;
`;

// Styled Button
export const Card = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  box-shadow: inset 0px -30px 99px #0000000a, 0px 8px 36px #a0bdc180;
  border-radius: 24px;
  padding: 24px;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.div`
  justify-content: space-between;
  gap: 10px;
  padding: 4px 12px;
  font-size: 20px;
  border-width: 2px;
  border-style: none;
  border-radius: 24px;
  box-shadow: 0px 7px 15px #00000033;
  white-space: nowrap;
  margin: auto 0;
  align-items: center;
  cursor: pointer;
  transition: 500ms;
  color: #fff;
  text-align: center;
  width: 100%;
  ${props => {
    switch (props.bg) {
      case "red":
        return css`
          background: red;
        `;
      case "blue":
        return css`
          background: blue;
        `;
      default:
        return css`
          background: #0089a7;
        `;
    }
  }}
  &:hover {
    transform: scale(0.9);
  }
`;
