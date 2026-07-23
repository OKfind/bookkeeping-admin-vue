type FileSystemManager = {
  readFile: (option: {
    filePath: string;
    encoding: "base64";
    success: (res: { data: string | ArrayBuffer }) => void;
    fail: (error: unknown) => void;
  }) => void;
};

const getFileSystemManager = () => {
  const uniApi = uni as unknown as { getFileSystemManager?: () => FileSystemManager };
  if (uniApi.getFileSystemManager) return uniApi.getFileSystemManager();

  const wxApi = globalThis as unknown as { wx?: { getFileSystemManager?: () => FileSystemManager } };
  return wxApi.wx?.getFileSystemManager?.();
};

const getImageMimeType = (filePath: string) => {
  const pathname = filePath.split("?")[0].toLowerCase();
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".gif")) return "image/gif";
  if (pathname.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
};

export const readImageAsBase64DataUrl = (filePath: string) => {
  if (filePath.startsWith("data:")) return Promise.resolve(filePath);

  const fileSystemManager = getFileSystemManager();
  if (!fileSystemManager) return Promise.reject(new Error("当前环境不支持读取图片文件"));

  return new Promise<string>((resolve, reject) => {
    fileSystemManager.readFile({
      filePath,
      encoding: "base64",
      success: ({ data }) => {
        if (typeof data !== "string") {
          reject(new Error("图片文件读取失败"));
          return;
        }

        resolve(`data:${getImageMimeType(filePath)};base64,${data}`);
      },
      fail: reject,
    });
  });
};
