import moment from 'moment';
import { getLocalStorageUserInitials } from 'src/utils';
import { AddresseeControls, MemorandumControls } from 'src/utils/constants';
import { getControlsByTag, insertTextControl, loadControls } from '../functions/processingWordControls';
import { SelectedMemorandumOrNoteState, AddresseesSchema } from '../interface/index';
export const sendDataToNote = async (form : SelectedMemorandumOrNoteState, addressee : AddresseesSchema) => {
        
    // Cargar base de documento
    await Word.run(async (context) => { 
        
        const controls = getControlsByTag(context, MemorandumControls);
        await loadControls(context, controls,MemorandumControls)

        Object.entries(controls).map((entry) => {
            const [key, control] = entry;

            switch (key) {

                // Insertar fecha
                case Object.keys(MemorandumControls)[0]:
                    insertTextControl(control, moment().format("LL").toString());
                    break;

                // Insertar iniciales
                case Object.keys(MemorandumControls)[1]:
                    insertTextControl(control, getLocalStorageUserInitials().toLowerCase());
                    break;

                // Insertar solicitante
                case Object.keys(MemorandumControls)[2]:
                    insertTextControl(control, form.from);
                    break;

                // Insertar asunto
                case Object.keys(MemorandumControls)[3]:
                    insertTextControl(control, form.subject);
                    break;

                // Insertar año
                case Object.keys(MemorandumControls)[4]:
                    insertTextControl(control, moment().year().toString());
                    break;
            }
            return null;
        });
    })

    // Cargar destinatario
    await Word.run(async (context) => { 
        const controls = getControlsByTag(context, AddresseeControls);
        await loadControls(context, controls,AddresseeControls)

        Object.entries(controls).map((entry) => {
            const [key, control] = entry;

            switch (key) {
                case Object.keys(AddresseeControls)[0]:
                    insertTextControl(control, addressee[form.to].archetype);
                    break;
                case Object.keys(AddresseeControls)[1]:
                    insertTextControl(control, addressee[form.to].department);
                    break;
                case Object.keys(AddresseeControls)[2]:
                    insertTextControl(control, addressee[form.to].jobTitle);
                    break;
                case Object.keys(AddresseeControls)[3]:
                    insertTextControl(control, addressee[form.to].name);
                    break;
            }
        })
    })

    if (form.hasCopy) {
    
        // Cargar información de con copia a destinatarios
        await Word.run(async (context) => {
            const table = context.document.body.tables;
            context.load(table);
            await context.sync();
                
            const row = table.items[0].rows;
                
            await context.sync();
                
            context.load(row);
            await context.sync();

            row.items[0].insertRows(Word.InsertLocation.after, form.cc.length, [""][""]);

        });

        await Word.run(async (context) => {
            const table = context.document.body.tables;
            context.load(table);
            await context.sync();
                
            const row = table.items[0].rows;
                
            context.load(row);
            await context.sync();

            const cells = [];
            form.cc.map((item, index) => {
                cells.push(row.items[index + 1].cells);
            });

            cells.map((item) => {
                context.load(item);
            });

            await context.sync();

            cells.map((item, index) => {
                item.items[0].body.insertText("CC:", Word.InsertLocation.replace);
                item.items[1].body.insertText(`${addressee[form.cc[index]].archetype} ${addressee[form.cc[index]].name}`, Word.InsertLocation.replace);
            });

            cells.map((item, index, array) => {
                item.items[1].body.insertText(
                    "\n" + addressee[form.cc[index]].jobTitle + (array[index + 1] ? "\n" : "")
                    , Word.InsertLocation.end
                ).font.bold = false;
            });
        });
    }
}