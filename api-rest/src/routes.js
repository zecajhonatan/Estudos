import { Router } from "express";
import SectionController from './app/controllers/sectionController.js' // classe
let router = Router();

// CREATE
router.post("/cadastro", SectionController.store)
// READ
router.get("/visualizar", SectionController.index)
// READ FOR ID 
router.get("/visualizarPorId/:id", SectionController.show)
// UPDATE
router.put("/atualizar/:id", SectionController.update)
// DELETE
router.delete("/delete/:id", SectionController.delete)

export default router