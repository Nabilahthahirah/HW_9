const express = require("express");
const router = express.Router();
const pool = require("../config/config.js");
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const { authorization } = require("../middlewares/authHandler.js");

router.get("/", async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    const findQuery = `
            SELECT
                *
            FROM movies
              LIMIT $1 OFFSET $2
            ;
        `;

    page = +page || DEFAULT_PAGE;
    limit = +limit || DEFAULT_LIMIT;
    let itemsPerPage = (page - 1) * limit;
    const result = await pool.query(findQuery, [limit, itemsPerPage]);

    const countQuery = `
      SELECT 
        COUNT (*)
      FROM movies
    `;

    let totalData = await pool.query(countQuery);
    totalData = +totalData.rows[0].count;

    let totalPage = Math.ceil(totalData / limit);

    let next = page < totalPage ? page + 1 : null;
    let previous = page > 1 ? page - 1 : null;

    res.status(200).json({
      data: result.rows,
      totalPage,
      totalData,
      currentPage: page,
      next,
      previous,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const findQuery = `
            SELECT
                *
            FROM movies
                WHERE id = $1;
        `;
    const result = await pool.query(findQuery, [id]);
    if (result.rows.length === 0) {
      throw { name: "ErrorNotFound" };
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    next(err);
  }
});

//Insert
router.post("/", authorization, async (req, res, next) => {
  try {
    const { title, genres, year } = req.body;

    const insertQuery = `
          INSERT INTO movies 
            ("title", "genres", "year") 
              VALUES ($1, $2, $3);
    `;

    const result = await pool.query(insertQuery, [title, genres, year]);
    res.status(201).json({ message: "Product Created Succesfully" });
  } catch (error) {
    next(error);
  }
});

// Update
router.put("/:id", authorization, async (req, res, next) => {
  try {
    const { title } = req.body;
    const { id } = req.params;

    const updateQuery = `
      UPDATE movies
        SET title = $1
        WHERE id = $2
      RETURNING *;
    `;
    const result = await pool.query(updateQuery, [title, id]);
    console.log(result.rows.length);
    if (result.rows.length === 0) {
      throw { name: "ErrorNotFound" };
    } else {
      res.status(200).json({ message: "Data updated successfully" });
    }
  } catch (err) {
    next(err);
  }
});

// Delete Movie
router.delete("/:id", authorization, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteQuery = `
      DELETE FROM movies
        WHERE id = $1
      RETURNING *;
    `;
    
    const result = await pool.query(deleteQuery, [id]);
    if (result.rows.length === 0) {
      throw { name: "ErrorNotFound" };
    } else {
      res.status(200).json({ message: "Data deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
