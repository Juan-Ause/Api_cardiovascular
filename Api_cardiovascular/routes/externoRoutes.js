const express = require('express');
const router = express.Router();
const externoController = require('../controllers/externoController');

// GET: listar usuarios externos con datos asociados
router.get('/', externoController.getUsuariosExternos);

// Obtener progreso de peso e IMC de un usuario
exports.getProgreso = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT fecha_registro, peso, imc
       FROM peso_imc_mensual
       WHERE usuario_id = $1
       ORDER BY fecha_registro ASC`,
      [usuario_id]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener progreso:', err.message);
    res.status(500).json({ error: 'Error al obtener datos de progreso' });
  }
};

module.exports = router;
