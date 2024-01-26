import { QRCodeCanvas } from "qrcode.react";
import React, { useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";

const EventQrCode = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const formattedData = Object.keys(data)
    .map((key) => `${key}: ${data[key]}`)
    .join(",\n");

  const handleDownload = () => {
    const canvas = document.getElementById("qrCodeCanvas");
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${data.eventName}_qr`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-xl font-medium">Save this QR code</h1>

        <div className="my-4">
          <QRCodeCanvas
            id="qrCodeCanvas"
            value={formattedData}
            size={170}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={true}
          />
        </div>

        <div className="my-2 flex justify-center">
          <button
            onClick={handleDownload}
            className={`text-lg font-semibold px-3 py-1 rounded-lg ${
              theme === "black" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventQrCode;
