const ProgramListing = require('../models/programListing');

const getProgramList = async (req, res, next) => {
  try {
      let query;
      const reqQuery = { ... req.query };
      const paramsToRemove = ['sort', 'page', 'limit'];
      paramsToRemove.forEach(param => delete reqQuery[param]);
      let searchQuery = {};
      if(req.query.programName) {
          searchQuery = { programName: req.query.programName };
      }
      if(req.query.schoolName) {
          searchQuery = { school: req.query.schoolName };
      }
      query = ProgramListing.find(searchQuery);
      // SORT
      if(req.query.sort) {
          const sortBy = req.query.sort.split(',').join(' ');
          query = query.sort(sortBy);
      }

      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 25;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const total = await ProgramListing.countDocuments();

      query = query.skip(startIndex).limit(limit);

      const programList = await query;

      let pagination = {};

      if(endIndex < total) {
          pagination.next = {
              page: page + 1,
              limit
          }
      }
      if(startIndex > 0) {
          pagination.previous = {
              page: page - 1,
              limit
          }
      }

      res.status(200).json({
          success: true,
          count: programList.length,
          pagination,
          list: programList
      });
  }  catch(err) {
      console.log(`Error at getProgramList ---- ${err}`.red.bold);
      res.status(500).json({
          success: false,
          error: err
      });
  }
};
module.exports = getProgramList;
