import express from "express";
import Paste from "../models/Paste.js";
import { getCurrentTime } from "../utils/time.js";

const router = express.Router();

/**
 * CREATE PASTE
 * POST /api/pastes
 */
router.post("/", async (req, res) => {
  console.log("Received request to create paste:", req.body);
  try {
    const { content, ttl_seconds, max_views } = req.body;
    console.log("Content:", content);
    console.log("TTL Seconds:", ttl_seconds);
    console.log("Max Views:", max_views); 

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ error: "Invalid content" });
    }

    if (ttl_seconds !== undefined && ttl_seconds < 1) {
      return res.status(400).json({ error: "Invalid ttl_seconds" });
    }

    if (max_views !== undefined && max_views < 1) {
      return res.status(400).json({ error: "Invalid max_views" });
    }

    const now = getCurrentTime(req);

    const expiresAt =
      ttl_seconds !== undefined
        ? new Date(now + ttl_seconds * 1000)
        : null;

    const paste = await Paste.create({
      content,
      expiresAt,
      maxViews: max_views ?? null,
    });


    // ✅ DYNAMIC BASE URL LOGIC
    // const isLocalhost =
    //   req.hostname === "localhost" || req.hostname === "127.0.0.1";

    // const protocol = req.protocol; // http or https
    // const host = req.get("host");  // localhost:5001 or domain.com

    // const baseUrl = isLocalhost
    //   ? `${protocol}://${host}`
    //   :
      const baseUrl= process.env.BASE_URL;

    res.status(201).json({
      id: paste._id,
      url: `${baseUrl}/api/pastes/${paste._id}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * FETCH PASTE (API)
 * GET /api/pastes/:id
 */
// router.get("/:id", async (req, res) => {
//   // console.log("Fetching paste with ID:", req.params.id);
//   try {
//     const paste = await Paste.findById(req.params.id);
//     if (!paste) {
//       return res.status(404).json({ error: "Not found" });
//     }

//     const now = getCurrentTime(req);

//     if (paste.expiresAt && now > paste.expiresAt.getTime()) {
//       return res.status(404).json({ error: "Expired" });
//     }

//     if (paste.maxViews !== null && paste.views >= paste.maxViews) {
//       return res.status(404).json({ error: "View limit exceeded" });
//     }

//     paste.views += 1;
//     await paste.save();

//     res.status(200).json({
//       content: paste.content,
//       remaining_views:
//         paste.maxViews === null ? null : paste.maxViews - paste.views,
//       expires_at: paste.expiresAt,
//     });
//   } catch (error) {
//     res.status(404).json({ error: "Not found" });
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);

    if (!paste) {
      return res.status(404).send("Paste not found");
    }

    const now = getCurrentTime(req);

    if (paste.expiresAt && now > paste.expiresAt.getTime()) {
      return res.status(404).send("Paste expired");
    }

    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
      return res.status(404).send("View limit exceeded");
    }

    paste.views += 1;
    await paste.save();

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Paste</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            background: #f9fafb;
            font-family: monospace;
          }
          .container {
            max-width: 900px;
            margin: 40px auto;
            padding: 20px;
          }
          .box {
            background: #ffffff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            white-space: pre-wrap;
            word-break: break-word;
            font-size: 14px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="container">
        <h2 style="text-align: center;">YOUR PASTE CONTENT</h2>
          <div class="box">${paste.content}</div>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(404).send("Paste not found");
  }
});

export default router;
