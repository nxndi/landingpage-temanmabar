import { useEffect, useState } from "react";
import appConfig from "../config/app.config";

const useDocumentTitle = ({
  title = appConfig.projectTitle,

  name = appConfig.projectName,
}: {
  /**
   * Project Name
   *
   * Example: Project Name | Page Name
   */
  title?: string;
  /**
   * Page Name
   *
   * Example: Project Name | Page Name
   */
  name?: string;
}) => {
  const [documentTitle, setDocumentTitle] = useState<string>(title);

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle, title, name]);

  return [documentTitle, setDocumentTitle];
};

export default useDocumentTitle;
