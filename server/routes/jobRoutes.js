const express = require('express');
const { createJob, getJobs, editJob, deleteJob, getJobById } = require('../controllers/jobController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createJob);
router.get('/', protect, getJobs);
router.get('/:jobId', protect, getJobById);  // This line is for fetching a job by ID

router.put('/:jobId', protect, editJob);
router.delete('/:jobId', protect, deleteJob);

module.exports = router;
