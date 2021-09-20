import { useEffect, useState } from 'react';
import { AiFillCamera } from 'react-icons/all';
import { ContainerFile } from './styles';

type InputFileProps = {
  name?: string;
}

export function InputFile({name}: InputFileProps) {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [filePreview, setFilePreview] = useState<string | undefined>('')

  useEffect(() => {
    if (!selectedFile) {
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setFilePreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTypeAccepted = ['image/png', 'image/svg+xml', 'image/svg' ,'image/jpeg'];

    const oneFile = e.target.files?.item(0);

    if(oneFile) {
      if (!fileTypeAccepted.includes(oneFile?.type)) {
        setSelectedFile(undefined);
        return
      } else {
        setSelectedFile(oneFile);
      };
    };
  }

  return (
    <ContainerFile className="file">
      <input 
        type="file" 
        name={name} 
        id="input_file"
        title={selectedFile?.name}
        onChange={(e) => onSelectFile(e)}
      />
      {filePreview && <img src={filePreview} alt="" />}
      <label htmlFor="input_file"></label>
      <AiFillCamera />
    </ContainerFile>
  )
}