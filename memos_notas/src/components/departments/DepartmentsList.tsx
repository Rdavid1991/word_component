import React, { ChangeEvent, useEffect, useState } from 'react';
import { InputText } from 'src/fragments';
import { DepartmentSchema } from 'src/helpers/interface';

interface Props {
    departments: Array<DepartmentSchema>;
    handlerEdit: (id: number) => void;
    handlerDelete: (id: number) => void;
}

export const DepartmentList = (props: Props) => {

    const { departments, handlerDelete, handlerEdit } = props;

    const [filtered, setFiltered] = useState<typeof departments>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        handlerFilterSearch();
    }, [search, departments]);

    const handlerInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setSearch(target.value);
    };

    const handlerFilterSearch = () => {

        const searching = departments.filter((functionary) => {
            return new RegExp(search, "i").test(functionary.jobTitle) ||
                new RegExp(search, "i").test(functionary.name) ||
                new RegExp(search, "i").test(functionary.shift) ? true : false;
        });

        setFiltered(searching);
    };

    return (
        <div className="px-3" >
            <div className="card my-2 rounded text-white gradient">
                <div className="card-body py-1">
                    <h3 className="font-weight-bold d-flex mb-2">Lista de funcionarios</h3>
                    <InputText
                        htmlId="search"
                        onChange={handlerInputChange}
                        icon="fas fa-search"
                        placeholder="Buscar departamento"
                        value={search || ""}
                    />
                </div>
            </div>

            <div className="card rounded h-100">
                <div className="card-body p-2 bg-light scroll rounded overflow-auto h-100">
                    {
                        filtered.map((item, index) => (
                            <div key={index} className="card rounded mb-2 bg-body">
                                <div className="card-body py-1">
                                    <h6
                                        className="font-weight-bold d-flex card-title">
                                        Nombre:&nbsp;
                                        <span className="font-weight-light">
                                            {item.name}
                                        </span>
                                    </h6>
                                    <p
                                        className="font-weight-bold d-flex m-0 text-muted">
                                        Teléfono:&nbsp;
                                        <span className="font-weight-light">
                                            {item.phone}
                                        </span>
                                    </p>
                                    <p
                                        className="font-weight-bold d-flex m-0 text-muted">
                                        Director / Jefe:&nbsp;
                                        <span className="font-weight-light">
                                            {item.shift}
                                        </span>
                                    </p>
                                    <p
                                        className="font-weight-bold d-flex m-0 text-muted">
                                        Posición:&nbsp;
                                        <span className="font-weight-light">
                                            {item.jobTitle}
                                        </span>
                                    </p>

                                    {
                                        item.id !== 0
                                            ?
                                                <>
                                                    <button className="btn btn-sm btn-secondary m-1" onClick={() => { handlerEdit(item.id); }}><i className="far fa-edit"></i></button>
                                                    <button className="btn btn-sm btn-secondary m-1" onClick={() => { handlerDelete(item.id); }}><i className="fas fa-trash-alt"></i></button>
                                                </>
                                            : null
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    );
};


export default React.memo(DepartmentList);