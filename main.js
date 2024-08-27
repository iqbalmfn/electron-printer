const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
  const url = process.argv[2]; // Mendapatkan URL dari argument

  // Periksa apakah URL valid
  if (!url) {
    console.error(
      "URL tidak tersedia. Pastikan Anda memberikan URL sebagai argumen."
    );
    app.quit(); // Tutup aplikasi jika URL tidak tersedia
    return;
  }

  let win = new BrowserWindow({ show: false });

  // Event listener untuk menangani error saat gagal memuat URL
  win.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription, validatedURL) => {
      console.error(
        `Gagal memuat URL: ${validatedURL}, Kode Error: ${errorCode}, Deskripsi: ${errorDescription}`
      );
      app.quit(); // Tutup aplikasi jika terjadi error saat memuat URL
    }
  );

  // Memuat URL
  win.loadURL(url).catch((error) => {
    console.error("Error saat memuat URL:", error);
    app.quit(); // Tutup aplikasi jika terjadi error saat memuat URL
  });

  win.webContents.on("did-finish-load", () => {
    // Coba melakukan print
    win.webContents.print(
      {
        silent: true, // Set to true to print without showing the print dialog
        printBackground: false,
        deviceName: "EPSON TM-T81 Receipt", // Printer name
        margins: {
          marginType: "Format Antrian", // No margin
        },
        pageSize: {
          width: 80 * 1000, // Lebar 80mm
          height: 80 * 1000, // Tinggi 80mm
        },
        scale: 100,
        landscape: false, // Pilih orientasi landscape jika perlu
      },
      (success, failureReason) => {
        if (!success) {
          console.error("Print gagal:", failureReason);
          app.quit(); // Tutup aplikasi setelah proses selesai (berhasil/gagal)
        } else {
          console.log("Print berhasil");
          app.quit(); // Tutup aplikasi setelah proses selesai (berhasil/gagal)
        }
      }
    );
  });
});
