import { DashboardService } from "@/services/dashboard.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class DashboardController {
  public dashboard = Container.get(DashboardService);

    public statsCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query
            console.info(query)
            if (!query.start_date || !query.end_date) {
                return res.status(400).json({ success: false, error: "Start Date and End Date Mandatory" })
            }
            const stats = await this.dashboard.getDashboardStats(query.start_date, query.end_date)
            console.info(stats)
            res.status(200).json({success:true, stats})
        } catch (err) {
            next(err)
        }
 }
}