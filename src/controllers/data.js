const {
  getData,
  postData,
  getCountData,
  getDataNoLimit,
} = require("../models/data");

module.exports = {
  getData: async (req, res) => {
    try {
      if (req.query.search === undefined || req.query.search === "undefined") {
        req.query.search = "";
      }
      if (
        req.query.page === undefined ||
        req.query.page === "undefined" ||
        req.query.page === ""
      ) {
        req.query.page = 1;
      }

      const search = `%${req.query.search}%`;
      const page = parseInt((req.query.page - 1) * 5);
      if (req.query.home) {
        const data = await getDataNoLimit();
        const totalData = await getCountData(search);
        return res.json({
          data,
          pagination: { page: parseInt(req.query.page), totalData },
        });
      } else {
        const data = await getData(search, page);
        const totalData = await getCountData(search);
        const totalPages = Math.ceil(totalData / 5);
        return res.json({
          data,
          pagination: { page: parseInt(req.query.page), totalPages },
        });
      }
    } catch (err) {
      return res.json(err);
    }
  },
  postData: async (req, res) => {
    try {
      const setData = req.body;
      setData.image = req.file.filename;
      const data = await postData(setData);

      return res.json({ data });
    } catch (err) {
      return res.json(err);
    }
  },
};
