const pool = require("../config/dbConfig");
const express = require('express');
const app = express();
app.use(express.json());


exports.showsalesstatdistchart = async (req, res) => {
  try {
    const result = await pool.query(`SELECT xstatus, count(xstatus) as cnt FROM opord group by xstatus`);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Send the entire row
    } else {
      res.status(404).json({ error: "No sales orders were found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sales orders" });
  }
};

exports.collectionduechart = async (req, res) => {
  try {
    const result = await pool.query(`select 'Order Amount' name, sum(xtotamt) amount from opodt
    union 
    select 'Due' name, sum(ordamt-coalesce(colamt,0.00)) amount from
    (select xcus, sum(xtotamt) ordamt from opodt inner join opord using(xordernum) group by xcus) opodt left join 
    (select xcus, sum(xamount) colamt from opcusrec group by xcus) opcusrec using(xcus) where (ordamt-coalesce(colamt,0.00))>0`);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Send the entire row
    } else {
      res.status(404).json({ error: "No records were found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch any records" });
  }
};

exports.topfivesupchart = async (req, res) => {
  try {
    const result = await pool.query(`select tbl.xorg, colamt, sum(xtotamt) salesamt from 
      (select xsup, xorg, colamt from 
      (select casup.xsup, casup.xorg, sum(xamount) colamt from opcusrec 
      inner join cacus using(xcus) 
      inner join casup using(xsup) group by casup.xsup, casup.xorg
      ) tbl order by colamt desc limit 5) tbl 
      inner join cacus using(xsup) 
      inner join opord using(xcus) 
      inner join opodt using(xordernum) 
      group by tbl.xorg, colamt`);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Send the entire row
    } else {
      res.status(404).json({ error: "No records were found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch any records" });
  }
};

exports.topfivefastmovingitemschart = async (req, res) => {
  try {
    const result = await pool.query(`select xitem, xamount from 
      (select xitem, sum(xamount) xamount from opcusrec inner join opodt using(xordernum) group by xitem) 
      tbl order by xamount desc limit 5`);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Send the entire row
    } else {
      res.status(404).json({ error: "No records were found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch any records" });
  }
};

