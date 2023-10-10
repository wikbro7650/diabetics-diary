import ThreadsList from "../../components/ThreadsList/ThreadsList";
import { useCollection } from "../../hooks/useCollection";
import "./ForumScreen.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ThreadFilter from "./ThreadFilter";

import { Button } from "antd";
import PostThreadScreen from "../PostThreadScreen/PostThreadScreen";
import FormModal from "../../components/FormModal/FormModal";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ForumScreen() {
  const { documents, error } = useCollection("threads");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();
  const [currentFilter, setCurrentFilter] = useState({
    text: "",
    group: "wszystkie",
  });
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const threads = documents
    ? documents
        .filter((document) => {
          switch (currentFilter) {
            case "wszystkie":
              return true;
            case "moje":
              return document.createdBy.id === user.uid ? true : false;
            case "Cukrzyca typu 1":
            case "Cukrzyca typu 2":
            case "Przyjaciele & rodzina":
            case "Jedzenie & dieta":
            case "Badanie cukru we krwi":
            case "Pompy insulinowe":
            case "Aktywność fizyczna":
            case "Utrata wagi":
            case "Powikłania":
            case "Przedstaw się":
              let haveCategory = false;
              document.category.forEach((c) => {
                if (c.value === currentFilter.group) {
                  haveCategory = true;
                }
              });
              return haveCategory;
            default:
              return true;
          }
        })
        .filter((document) =>
          document.title
            .toString()
            .toLowerCase()
            .includes(currentFilter.text.toString().toLowerCase())
        )
    : null;

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setModalOpen(false);
      navigate("/forum");
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };
  return (
    <div className="forum-screen">
      <h2 className="page-title">Forum</h2>
      {/* <div className="forum-screen"> */}
      <Button
        icon={<PlusOutlined />}
        className="add-button"
        onClick={() => setModalOpen(true)}
      >
        Dodaj post
      </Button>
      <FormModal
        title=""
        isVisible={modalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        modalClassName="add-thread"
      >
        <PostThreadScreen onSubmit={handleCancel} />
      </FormModal>
      {error && <p className="error">{error}</p>}

      {documents && (
        <ThreadFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {documents && <ThreadsList threads={threads} />}
      {/* </div> */}
    </div>
  );
}
