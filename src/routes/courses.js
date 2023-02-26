const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:slug', courseController.course);
router.post('/handle-form-actions', courseController.handleFormActions);
router.post('/handle-trash-can', courseController.handleTrashCan);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.force);
router.get('/:id/edit', courseController.edit);

module.exports = router;
