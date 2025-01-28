import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import serverApi from "Services/httpService";
import { Link, useParams } from "react-router-dom";
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

function Permissions({ closeModal }) {
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
    <Container>
      <Header>دسترسی‌ها</Header>
      <Grid>
        {permissionsData?.map((item: any) => (
          <Card key={item.title}>
            <ParentItem onClick={() => toggleExpand(item.title)}>
              <ParentCheckbox
                type="checkbox"
                ref={el => (parentRefs.current[item.title] = el)}
                checked={
                  item?.actions?.every((action: any) => selectedCheckboxes[action.route]) &&
                  item?.actions?.length > 0
                }
                onChange={e => handleParentCheckboxChange(item?.title, e.target.checked)}
              />
              <ParentText>{item.displayName}</ParentText>
              <ExpandIcon>{expanded.includes(item.title) ? "🔽" : "◀️"}</ExpandIcon>
            </ParentItem>

            {expanded.includes(item.title) && (
              <ChildItemsContainer>
                {item?.actions?.map((action: any) => (
                  <ChildItem key={action.name}>
                    <ChildCheckbox
                      type="checkbox"
                      checked={!!selectedCheckboxes[action?.route]}
                      onChange={e => handleChildCheckboxChange(action?.route ?? "", e.target.checked)}
                    />
                    <ChildText>{action.displayName}</ChildText>
                  </ChildItem>
                ))}
              </ChildItemsContainer>
            )}
          </Card>
        ))}
      </Grid>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "8px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Link
          to="/personnel"
          className="col-3 input-effect"
          style={{ width: "10vw", fontSize: "1.5rem" }}
          onClick={closeModal}
        >
          انصراف
        </Link>
        <SubmitButton className="col-3 input-effect" style={{ width: "10vw" }} onClick={submit}>
          {mutation.isLoading ? "در حال ثبت" : "ثبت"}
        </SubmitButton>
      </div>
    </Container>
  );
}

export default Permissions;

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  direction: ltr;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 0px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ParentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const ParentCheckbox = styled.input`
  margin-right: 8px;
`;

const ParentText = styled.span`
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
`;
const ExpandIcon = styled.span`
  margin-left: 8px;
`;
const ChildItemsContainer = styled.div`
  padding-left: 16px;
  margin-top: 8px;
  white-space: nowrap;
`;

const ChildItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ChildCheckbox = styled.input`
  margin-right: 8px;
`;

const ChildText = styled.span`
  font-size: 14px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 18px;
  background-color: #0089a7;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #006f8a;
  }
`;
