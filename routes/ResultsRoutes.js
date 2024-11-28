const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const directoryPath = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    req.body.PathOfFile = path.join(
      __dirname,
      "..",
      "uploads",
      file.originalname
    );
    cb(null, directoryPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const ResultsController = require("../controllers/ResultsController");

router.get("/get_all_requests_table", ResultsController.get_all_requests_table);
router.get(
  "/velociraptor-single-result",
  ResultsController.get_single_velociraptor_response
);
router.get("/download-json-file", ResultsController.download_json_file);

router.get(
  "/velociraptor-aggregate-macro",
  ResultsController.get_velociraptor_aggregate_macro
);
router.get(
  "/check_last_req_and_res_for_module",
  ResultsController.check_last_req_and_res_for_module
); /// check to delete

router.delete("/delete-results-by-ids/", ResultsController.delete_results);
router.post(
  "/ImportVeloResult",
  upload.single("file"),
  ResultsController.ImportVeloResult
);

//  router.get('/count-responses-files', ResultsController.count_velociraptor_responses);

//  router.get('/get_all_latest_results_dates', ResultsController.get_all_latest_results_dates);
//

/// its for test
//  router.post('/write_to_csv', ResultsController.write_to_csv);
// router.get('/all-request-and-response', ResultsController.get_all_request_and_response);
//  router.get('/all-velociraptor-results', ResultsController.get_all_velociraptor_responses_file_list);

module.exports = router;
