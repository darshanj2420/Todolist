import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import {
  AiTwotoneDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineCheck,
} from "react-icons/ai";

const getLocalitems = () => {
  let list = localStorage.getItem("todoitems");
  if (list) {
    return JSON.parse(localStorage.getItem("todoitems"));
  } else {
    return [];
  }
};
const Todo = () => {
  const [list, setList] = useState(getLocalitems());
  const [todo, setTodo] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [toggel, setToggel] = useState(true);
  const [isView, setView] = useState(true);

  //   Add Todo
  let handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      alert("Please fillout the form first 😅");
    } else if (todo && !toggel) {
      setList(
        list.map((e) => {
          if (e.id === isEdit) {
            return { ...e, name: todo };
          }
          return e;
        })
      );
      setTodo("");
      setIsEdit(null);
      setToggel(true);
    } else {
      let allData = { id: new Date().getTime().toString(), name: todo };
      console.log(allData);
      setList([...list, allData]);
      setTodo("");
    }
  };
  //   Delete Todo
  const deleteList = (index) => {
    let res = list.filter((result) => index !== result.id);
    setList(res);
  };
  //   Edit todo
  const editlist = (id) => {
    let newlist = list.find((elem) => {
      return elem.id === id;
    });
    setTodo(newlist.name);
    setIsEdit(id);

    setToggel(false);
    setView(true);
  };
  //   View Todo
  const viewlist = (id) => {
    let newlist = list.find((elem) => {
      return elem.id === id;
    });
    setTodo(newlist.name);
    // setIsEdit(id)

    setView(false);
  };
  //   Remove all
  const RemoveAll = () => {
    setList([]);
  };
  //   set data Localstorage
  useEffect(() => {
    localStorage.setItem("todoitems", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <div className="container">
        <div
          className="row bg-primary rounded-3 shadow-lg my-5"
          style={{ transform: "translate(0px, 26px)" }}
        >
          {/* Heading */}
          <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
            <form onSubmit={handleSubmit}>
              <div className="Todo-heading text-center text-white">
                <h1>Simple Todo List</h1>
              </div>

              {/* Inputbox */}
              <div>
                {isView ? (
                  <div className="d-flex justify-content-center">
                    <input
                      type="text"
                      className="form-control w-50"
                      value={todo}
                      onChange={(e) => {
                        setTodo(e.target.value);
                      }}
                      placeholder=" 👉 Type Here..."
                    />
                    <button className="btn btn-light ms-1">
                      {toggel ? (
                        <AiOutlineCheck className="fs-5 text-success" />
                      ) : (
                        <AiFillEdit className="fs-5 text-success" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <input
                      type="text"
                      className="form-control w-25 "
                      value={todo}
                    />
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* List */}
          <div className="col-lg-12 mt-5">
            <Scrollbars style={{ width: "100%", height: "20rem" }}>
              <div className="todo-bottom ">
                <ol className="list-group d-flex flex-column m-auto  mb-5 w-75">
                  {list.map((e, i) => (
                    <li
                      className="list-group-item d-flex justify-content-between "
                      key={e.id}
                    >
                      <div>
                        <span>{i + 1}</span>
                        &nbsp;&nbsp;
                        <span>{e.name}</span>
                      </div>
                      <div>
                        <p className=" fs-4 d-flex align-content-center">
                          <span className="text-info">
                            <AiFillEye onClick={() => viewlist(e.id)} />
                          </span>
                          <span className="text-success">
                            <AiFillEdit onClick={() => editlist(e.id)} />
                          </span>
                          <span className="text-danger">
                            <AiTwotoneDelete onClick={() => deleteList(e.id)} />
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Scrollbars>
            <div className="d-flex justify-content-center mt-5 mb-5">
              {list.length < 1 ? (
                <h1>Please enter something</h1>
              ) : (
                <button
                  className="btn btn-info"
                  onClick={() => {
                    RemoveAll();
                  }}
                >
                  Remove All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
