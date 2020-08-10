import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import AddDocument from "./AddDocument";
import apiConfig from "../../../../configs/api";
import {
  getDocsByTaskId,
  deleteDoc,
  clearDocuments,
} from "../../../../store/actions/document";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { taskStatus } from "../../../../constants/uiconstants";

const styles = {
  actionColumn: {
    width: "15%",
  },

  textAlignRight: {
    textAlign: "right",
  },
  addButtonCol: {
    paddingRight: "1.75rem",
    paddingTop: 10,
    paddingBottom: 10,
  },
};
const DocumentList = (props) => {
  let taskId = props.taskGuid;

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [docToRemove, setDdocToRemove] = useState("");
  const [isRemoveModelOpen, setIsRemoveModelOpen] = useState(false);
  const toggleRemoveModel = () => {
    setIsRemoveModelOpen(!isRemoveModelOpen);
  };

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
    let dispatch = props.dispatch;
    if (taskId && taskId.length === 36) {
      dispatch(
        getDocsByTaskId(
          `${apiConfig.baseUrl}Documents/GetDocumentsByTaskId`,
          taskId
        )
      );
    } else {
      dispatch(clearDocuments());
    }
  };

  useEffect(() => {
    let dispatch = props.dispatch;
    if (taskId && taskId.length === 36) {
      dispatch(
        getDocsByTaskId(
          `${apiConfig.baseUrl}Documents/GetDocumentsByTaskId`,
          taskId
        )
      );
    } else {
      dispatch(clearDocuments());
    }
  }, [props.dispatch, taskId]);

  useEffect(() => {
    if (props.documents && props.documents.length > 0) {
      props.setDocCount(props.documents.length);
    } else {
      props.setDocCount(0);
    }
  }, [props.documents]);

  const removeDocument = () => {
    if (docToRemove && docToRemove.length > 0) {
      let dispatch = props.dispatch;
      dispatch(deleteDoc(`${apiConfig.baseUrl}Documents/${docToRemove}`)).then(
        () => {
          dispatch(
            getDocsByTaskId(
              `${apiConfig.baseUrl}Documents/GetDocumentsByTaskId`,
              taskId
            )
          );
          setIsRemoveModelOpen(false);
        }
      );
    }
  };

  const downloadDocument = (fileName, documentId) => {
    axios({
      method: "get",
      responseType: "arraybuffer", //Force to receive data in a Blob Format
      url: `${apiConfig.baseUrl}Documents/Download/${documentId}`,
    })
      .then((res) => {
        const blob = new Blob([res.data], {
          type: "application/octet-stream",
        });

        saveData(blob, fileName);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
      var json = JSON.stringify(data),
        blob = new Blob([json], { type: "octet/stream" }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  })();

  const docList = [...props.documents];
  const disable = props.taskStatusId === taskStatus.Completed;
  // console.log(docList);
  return (
    <Container>
      <Row>
        <Col style={{ ...styles.textAlignRight, ...styles.addButtonCol }}>
          <Button
            disabled={disable}
            type="button"
            onClick={() => toggleModel()}
          >
            Add Document
          </Button>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Document Name</th>
            <th style={{ ...styles.actionColumn, ...styles.textAlignRight }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {docList && docList.length > 0
            ? docList.map((doc) => {
                return (
                  <tr key={doc.id}>
                    <th scope="row">{doc.documentType}</th>
                    <td>
                      <span
                        style={{ cursor: "pointer" }}
                        title="Click to download"
                        onClick={() =>
                          downloadDocument(doc.documentName, doc.id)
                        }
                      >
                        {doc.documentName}
                      </span>
                    </td>
                    <td
                      style={{
                        ...styles.actionColumn,
                        ...styles.textAlignRight,
                      }}
                    >
                      <Button
                        disabled={
                          props.loggedInUser.id !== doc.createdBy || disable
                        }
                        type="button"
                        onClick={() => {
                          toggleRemoveModel();
                          setDdocToRemove(doc.id);
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      <AddDocument
        isModelOpen={isModelOpen}
        toggleModel={toggleModel}
        taskGuid={props.taskGuid}
        portfolioId={props.portfolioId}
      />

      <Modal
        isOpen={isRemoveModelOpen}
        toggle={toggleRemoveModel}
        className={""}
      >
        <ModalHeader toggle={toggleRemoveModel}>Delete Document</ModalHeader>
        <ModalBody>
          <div> {`Are you sure you want to delete?`}</div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleRemoveModel}>
            Cancel
          </Button>
          <Button color="primary" type="button" onClick={removeDocument}>
            Remove
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    loggedInUser: state.dbUser.loggedInUser,
  };
};

export default withRouter(connect(mapStateToProps)(DocumentList));
