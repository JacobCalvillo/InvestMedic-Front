import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog.tsx";
import { FormFieldType } from "@/constants";
import CustomFormField from "../../../../shared/components/ui/CustomFormField.tsx";
import { SelectItem } from "@/shared/components/ui/select.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import FileUploader from "../../../../shared/components/ui/FileUploader.tsx";
import { getIdentificationTypes } from "@/features/patients/services/identificationTypesService.ts";
import {IdentificationsType} from "@/features/patients/types/IdentificationsType.ts";

const IdentificationDialog = ({ control }: { control: any}) => {
  const [identificationTypes, setIdentificationTypes] = useState<IdentificationsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdentificationTypes = async () => {
      try {
        const types = await getIdentificationTypes();
        setIdentificationTypes(types || []);
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
                  ) : (identificationTypes.map((identification) => (
                          <SelectItem key={identification.id} value={identification.id?.toString() || "No hay datos"} >
                              {identification.id} {identification.type}
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
