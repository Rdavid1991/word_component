import React, { useEffect, useState } from 'react'


export const TemplateList = ({ fetchTemplate, documentsState }) => {


  const [searchState, setSearchState] = useState("")

  //doc: "{\"body\":\"<?xml version=\\\"1.0\\\" standalone=
  //id: 1
  //name:

  useEffect(() => {
    fetchTemplate();
  }, [])


  return (
    <>
      {
        documentsState.map((item, index) => {

          if (searchState.length > 0 &&
            new RegExp(searchState, "i").test(item.name)
          ) {
            return (
              <div key={index} className="card shadow-sm p-3 mb-2 bg-body">
                <div className="card-body">
                  <h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
                  <p className="fw-bold m-0 text-muted">Tipo: <span className="fw-light">{item.id}</span></p>
                </div>
              </div>
            )
          } else if (searchState.length <= 0) {
            return (
              <div key={index} className="card shadow-sm p-3 mb-2 bg-body">
                <div className="card-body">
                  <h6 className="fw-bold card-title">Nombre: <span className="fw-light">{item.name}</span></h6>
                  <p className="fw-bold m-0 text-muted">Tipo: <span className="fw-light">{item.id}</span></p>
                  <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerEdit(index)}><i className="far fa-edit"></i></button>
                  <button className="btn btn-sm btn-secondary m-1" onClick={() => handlerDelete(index)}><i className="fas fa-trash-alt"></i></button>
                </div>
              </div>
            )
          }
        })
      }
    </>
  )
}
