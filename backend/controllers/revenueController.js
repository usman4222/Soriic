const catchAsyncError = require("../middleware/catchAsyncError");
const revenue = require("../models/revenueModel");
const ErrorHandler = require("../utils/errorHanlder");


exports.createRevenue = catchAsyncError(async (req, res, next) => {
    try {
        const { ref, amount, date, description, month } = req.body

        const Revenue = new revenue({ ref, amount, date, description, month })

        const revenueSalary = await Revenue.save()

        res.status(200).json({
            success: true,
            data: revenueSalary,
            message: "Revenue Created Successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
})



exports.getAllRevenue = catchAsyncError(async (req, res, next) => {
    try {
        const revenues = await revenue.find();

        if (revenues.length === 0) {
            return next(new ErrorHandler("No Revenues Found", 400));
        }

        res.status(200).json({
            success: true,
            revenues,
            error: { message: "This is an error while getting all revenues" }
        });
    } catch (error) {
        return next(new ErrorHandler("Error getting revenues", 500));
    }
});



exports.getCurrentMonthRevenue = catchAsyncError(async (req, res, next) => {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; 
        const currentYear = currentDate.getFullYear(); 

        const totalMonthlyRevenue = await revenue.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, currentMonth] }, 
                    { $eq: [{ $year: "$date" }, currentYear] }, 
                ],
            },
        });

        if (totalMonthlyRevenue.length === 0) {
            return next(new ErrorHandler("No Revenues Found for this month", 404));
        }

        const totalCurrentMonthRevenue = totalMonthlyRevenue.reduce(
            (total, revenue) => total + parseFloat(revenue.amount),
            0
        );

        res.status(200).json({
            success: true,
            totalCurrentMonthRevenue,
        });
    } catch (error) {
        return next(new ErrorHandler("Error getting current month revenue", 500));
    }
});
