import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { Modal, ConfirmButton, Typography, Dropdown } from "../../Commons";

// Styled Elements
import { ListStyles } from "../../../assets/styles/employees";

// Images
import Close from "../../../assets/item-actions/close-white-color-red-bg.svg";
import Arrow from "../../../assets/item-actions/red-down.svg";
//این مهمه دوباره برگرده
// import { deleteRelation } from "routes/Home/Relation/Module";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const DeleteModal = ({
  type,
  onClose,
  items,
  notShowDeletebox,
  fetchDeleteData,
  navigateAddress,
  setCurrentPage,
  setBoxes,
  hoverDetail,
  deleteTest,
  deleteItems,
  liness,
  boxes,
}) => {
  // Hooks

  const dispatch = useDispatch();
  // States
  const [deleteCause, setDeleteCause] = useState(null);
  const { Token } = useSelector((state) => state.auth);
  const history = useHistory();

  // Handlers
  const deleteCauseChangeHandler = (text) => setDeleteCause(text);

  const closeModalHandler = () => onClose(false);

  const confirmHandler = () => {
    if (deleteTest !== undefined) {
      deleteTest((current) =>
        current.filter(
          (item) =>
            item.source.Unique !== deleteItems.source.Unique ||
            item.target.Unique !== deleteItems.target.Unique
        )
      );
      for (let index = 0; index < boxes.length; index++) {
        for (let x = 0; x < boxes[index].entity.Relations.length; x++) {
          if (
            boxes[index].entity.Relations[x].PrimaryKey.Unique ===
              deleteItems.source.Unique &&
            boxes[index].entity.Relations[x].ForeignKey.Unique ===
              deleteItems.target.Unique
          ) {
            setBoxes((prev) =>
              prev.map((item, idx) => {
                if (idx === index) {
                  return {
                    ...item,
                    entity: {
                      ...item.entity,
                      Relations: item.entity.Relations.filter(
                        (item) =>
                          item.PrimaryKey.Unique !==
                            deleteItems.source.Unique ||
                          item.ForeignKey.Unique !== deleteItems.target.Unique
                      ),
                    },
                  };
                } else {
                  return item;
                }
              })
            );
          }
        }
      }

      dispatch(
        // deleteRelation(Token, {
        //   PrimaryKeyUnique: deleteItems.source.Unique,
        //   ForeignKeyUnique: deleteItems.target.Unique,
        // })
      );
      onClose(false);
    } else {
      // if (deleteCause === null) return;
      // eslint-disable-next-line no-unused-vars
      const template = {
        ...items,
        deleteCause: deleteCause,
        deleteTime: new Date().toLocaleDateString("fa-IR"),
      };
      if (fetchDeleteData !== undefined) {
        dispatch(
          fetchDeleteData(Token, items[items.length - (hoverDetail ? 2 : 1)])
        );
      }
      setCurrentPage(1);
      history.push(navigateAddress);
    }
  };
  return (
    <Modal>
      {!notShowDeletebox ? (
        <>
          <ListStyles.CloseBadge
            onClick={closeModalHandler}
            src={Close}
            alt="Close"
          />
          <ListStyles.DeleteContainer>
            <ListStyles.TopSide>
              <Typography size="xl" weight="light">
                آیا از حذف این {type} مطمئنید؟
              </Typography>
              <div>
                <ConfirmButton onClick={confirmHandler} variant="bordered">
                  <Typography>بله</Typography>
                </ConfirmButton>
                <ConfirmButton onClick={closeModalHandler}>
                  <Typography>خیر</Typography>
                </ConfirmButton>
              </div>
            </ListStyles.TopSide>
            {type === "کارمند" ? (
              <ListStyles.BottomSide>
                <Typography size="xl" weight="light">
                  علت حذف:
                </Typography>
                <Dropdown
                  firstData="انتخاب کنید"
                  dropData={["پایان دوره خدمت", "اخراج", "استعفا", "سایر"]}
                  imageSrc={Arrow}
                  setSelectedState={deleteCauseChangeHandler}
                />
              </ListStyles.BottomSide>
            ) : null}
          </ListStyles.DeleteContainer>
        </>
      ) : null}
    </Modal>
  );
};
