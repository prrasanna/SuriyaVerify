import axios from "axios";

const verifyController = {
  verifyLocation: async (req, res) => {
    try {
      const { address } = req.body;

      // Dummy response (later you can add real satellite API)
      return res.json({
        success: true,
        lat: 28.6139,
        lng: 77.2090,
        roofArea: "120 sq ft",
        suggestedKW: 3,
      });

    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },
};

export default verifyController;
