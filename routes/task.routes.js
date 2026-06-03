const { Router } = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/task.controller');
const { protect } = require('../middlewares/auth.middleware');
const router = Router();


router.route('/')
  .get(protect, getTasks)       
  .post(protect, createTask);  

router.route('/:id')
  .patch(protect, updateTask)  
  .delete(protect, deleteTask); 

module.exports = router;