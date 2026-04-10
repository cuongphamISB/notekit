import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [os, setOs] = useState<"ios" | "android" | "other">("other");

  useEffect(() => {
    // 1. Check if user came from QR code
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("source");

    // 2. Check if already running as a standalone PWA
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;

    if (source === "qr" && !isStandalone) {
      setIsVisible(true);

      // Detect OS for specific instructions
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(userAgent)) {
        setOs("ios");
      } else if (/android/.test(userAgent)) {
        setOs("android");
      }
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-end justify-center p-4">
      <div className="bg-white max-w-sm w-full rounded-2xl p-6 shadow-2xl transform transition-transform animate-in slide-in-from-bottom-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/sticker nhân vật.webp"
              alt="NORA Icon"
              className="w-12 h-12 rounded-xl object-contain bg-[#eef4f8] p-1 shadow-sm"
            />
            <div>
              <h3 className="font-bold text-lg text-slate-800 leading-tight">Cài đặt NORA</h3>
              <p className="text-sm text-slate-500">Tải app về máy để lưu trải nghiệm</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 active:bg-slate-200"
          >
            ✕
          </button>
        </div>

        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-2">
          {os === "ios" ? (
            <p className="text-slate-700 text-[15px] leading-relaxed">
              Bạn đang dùng iPhone! Hãy nhấn biểu tượng{" "}
              <b className="text-blue-600 inline-block align-middle mx-1 px-1.5 py-0.5 bg-white border rounded shadow-sm">
                Share ⍐
              </b>{" "}
              ở cạnh dưới màn hình, sau đó lướt xuống và chọn{" "}
              <b className="font-semibold text-slate-900">Thêm vào MH chính (Add to Home Screen) ➕</b>.
            </p>
          ) : os === "android" ? (
            <p className="text-slate-700 text-[15px] leading-relaxed">
              Bạn đang dùng Android! Hãy nhấn biểu tượng{" "}
              <b className="text-blue-600 inline-block align-middle mx-1">⋮</b>{" "}
              (Menu) ở góc trên bên phải Chrome, sau đó chọn{" "}
              <b className="font-semibold text-slate-900">Thêm vào màn hình chính (Add to Home screen)</b>.
            </p>
          ) : (
            <p className="text-slate-700 text-[15px] leading-relaxed">
              Hãy thêm trang web này vào màn hình chính của bạn (Add to Home screen) thông qua menu của trình duyệt để sử dụng như một App thực thụ!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
