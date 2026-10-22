import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.raw({ type: 'application/pdf', limit: '100mb' }));
  app.use(express.json({ limit: '100mb' }));

  // Status of the portfolio PDF
  app.get('/api/portfolio-pdf-status', (req, res) => {
    const candidatePaths = [
      path.join(process.cwd(), 'public', '2026_포트폴리오_신혜진.pdf'),
      path.join(process.cwd(), 'public', 'portfolio.pdf'),
      path.join(process.cwd(), 'public', '신혜진_포트폴리오.pdf'),
      path.join(process.cwd(), 'public', 'portfolio_2026.pdf')
    ];
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        const stats = fs.statSync(p);
        return res.json({
          exists: true,
          path: p,
          filename: path.basename(p),
          size: stats.size,
          sizeMb: (stats.size / (1024 * 1024)).toFixed(2),
          mtime: stats.mtime
        });
      }
    }
    return res.json({ exists: false });
  });

  // Dedicated upload route to directly save the user's authentic PDF with 0% corruption
  app.post('/api/upload-portfolio-pdf', (req, res) => {
    try {
      let buffer: Buffer | null = null;
      let filename = '2026_포트폴리오_신혜진.pdf';

      if (Buffer.isBuffer(req.body) && req.body.length > 0) {
        buffer = req.body;
      } else if (req.body && req.body.base64) {
        const cleanBase64 = req.body.base64.replace(/^data:application\/pdf;base64,/, '');
        buffer = Buffer.from(cleanBase64, 'base64');
        if (req.body.filename) filename = req.body.filename;
      }

      if (!buffer || buffer.length === 0) {
        return res.status(400).json({ error: 'No PDF data received' });
      }

      const targets = [
        path.join(process.cwd(), 'public', '2026_포트폴리오_신혜진.pdf'),
        path.join(process.cwd(), 'public', 'portfolio.pdf'),
        path.join(process.cwd(), 'public', 'portfolio_2026.pdf'),
        path.join(process.cwd(), 'src', 'assets', 'images', '2026_포트폴리오_신혜진.pdf')
      ];

      const distDir = path.join(process.cwd(), 'dist');
      if (fs.existsSync(distDir)) {
        targets.push(
          path.join(distDir, '2026_포트폴리오_신혜진.pdf'),
          path.join(distDir, 'portfolio.pdf'),
          path.join(distDir, 'portfolio_2026.pdf')
        );
      }

      for (const target of targets) {
        const dir = path.dirname(target);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(target, buffer);
      }

      console.log(`[SUCCESS] Saved authentic portfolio PDF (${buffer.length} bytes) to ${targets.length} targets`);
      return res.json({
        success: true,
        size: buffer.length,
        sizeMb: (buffer.length / (1024 * 1024)).toFixed(2),
        filename
      });
    } catch (err: any) {
      console.error('Failed to upload PDF:', err);
      return res.status(500).json({ error: err.message || 'Failed to save PDF' });
    }
  });

  // Dedicated route for downloading the portfolio PDF with correct headers
  app.get('/api/download-portfolio-pdf', (req, res) => {
    const candidatePaths = [
      path.join(process.cwd(), 'public', '2026_포트폴리오_신혜진.pdf'),
      path.join(process.cwd(), 'public', 'portfolio.pdf'),
      path.join(process.cwd(), 'public', '신혜진_포트폴리오.pdf'),
      path.join(process.cwd(), 'public', 'portfolio_2026.pdf')
    ];

    const pdfPath = candidatePaths.find(p => fs.existsSync(p)) || candidatePaths[candidatePaths.length - 1];
    res.setHeader('Content-Type', 'application/pdf');
    const encodedName = encodeURIComponent('2026_포트폴리오_신혜진.pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="2026_portfolio_hyejin_shin.pdf"; filename*=UTF-8''${encodedName}`
    );
    res.sendFile(pdfPath, (err) => {
      if (err) {
        console.error('PDF download error:', err);
        res.status(500).send('Error downloading PDF file');
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
