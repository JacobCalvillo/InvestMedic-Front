import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormFieldType } from "@/constants";
import CustomFormField from "../CustomFormField";
import { SelectItem } from "../ui/select";
import { Button } from "../ui/button";
import FileUploader from "../FileUploader";
import { getIdentificationTypes } from "@/services/identificationTypesService";
import IdentificationsType from "@/models/IdentificationsType";

const IdentificationDialog = ({ control }: { control: any }) => {
  // State to store fetched data
  const [identificationTypes, setIdentificationTypes] = useState<IdentificationsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdentificationTypes = async () => {
      try {
        const types = await getIdentificationTypes(); // Await async function
        console.log("Fetched identification types:", types);
        setIdentificationTypes(types || []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching identification types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdentificationTypes();
  }, []);

  return (
      <Dialog>
        <DialogTrigger>
          <Button type="button" className="btn btn-primary">Abrir Identificación</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Identificación y Verificación</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={control}
                name="identificationType"
                label="Tipo de Identificación"
                placeholder="Selecciona un tipo de identificación"
            >
              {loading ? (
                  <p>Cargando...</p>
              ) : (
                  identificationTypes.map((id) => (
                      <SelectItem key={id.id} value={id.id}>
                        {id.type} {/* Assuming "type" is the correct field */}
                      </SelectItem>
                  ))
              )}
            </CustomFormField>

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={control}
                name="identificationNumber"
                label="Número de Identificación"
                placeholder="123456"
            />

            <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={control}
                name="identificationDocument"
                label="Documento de Identificación"
                renderSkeleton={(field) => (
                    <FileUploader files={field.value} onChange={field.onChange} />
                )}
                placeholder="Subir documento"
            />
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default IdentificationDialog;
