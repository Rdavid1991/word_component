import { useContext } from 'react';
import { Space } from 'src/fragments';
import { loadDocumentSelected } from 'src/helpers/documents/loadDocumentSelected';
import { useForm } from 'src/hooks/useForm';
import { deleteDocumentTemplate, getDocumentTemplate } from 'src/utils/SaveAndGet';
import TemplateCreate from '../components/templates/TemplateCreate';
import TemplateList from '../components/templates/TemplateList';
import { FetchContext } from '../context/context';
import { TemplateInfoSchema } from '../helpers/interface/index';

const initialTemplateInfoState: TemplateInfoSchema = {
    department_owner_id : 0,
    edit                : false,
    id                  : 0,
    name                : "",
    type                : 0,
};

interface Props {
    templates: Array<TemplateInfoSchema>
}

export const Template = ({ templates }: Props) => {

    const [values, setValues, handleInputChange, reset] = useForm<typeof initialTemplateInfoState>(initialTemplateInfoState);
    const { fetchTemplate } = useContext(FetchContext);

    const handlerEdit = async (id: number) => {

        const templateFound = templates.find((template) => template.id === id);
        const template = await getDocumentTemplate(id);

        setValues({
            ...values,
            ...templateFound,
            edit: true
        });

        loadDocumentSelected(JSON.parse(template.data[0].doc));
        document.querySelector(".tab-content").scrollTo(0, 0);
    };

    const handlerDelete = async (id) => {
        const deleted = await deleteDocumentTemplate(id);
        if (deleted) fetchTemplate();
    };

    return (
        <>
            <div className="w-100 px-3">
                <div className="card my-2 rounded  text-white gradient">
                    <div className="card-body py-1">
                        <h3 className="font-weight-bold text-truncate">Plantillas</h3>
                        <p className="text-truncate" style={{ fontSize: "14px" }}>Agregar o editar plantillas de documentos</p>
                    </div>
                </div>
            </div>
            <div className="template_pane h-100">
                <div className="px-3">
                    <TemplateCreate
                        values={values}
                        reset={reset}
                        handleInputChange={handleInputChange}
                    />
                </div>
                <div className="px-3"><hr /></div>
                <div className="px-3">
                    <TemplateList
                        documents={templates}
                        handlerEdit={handlerEdit}
                        handlerDelete={handlerDelete}
                    />
                </div>
                <Space height={10} />
            </div>
        </>
    );
};