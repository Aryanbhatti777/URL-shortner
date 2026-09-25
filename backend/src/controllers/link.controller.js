import linkModel from "../models/link.model.js"
import { generateCode } from "../utils/generateCode.util.js"


export const generateLink = async(req, res) => {
    
    try {
        
        const { link } = req.body

        if (!link) {
            return res.status(400).json({
                message: "Please enter the url "
            })
        }

        if ((link.startsWith("http://") === false) && (link.startsWith("https://") === false)) {
            return res.status(400).json({
                message: "Please enter a valid url"
            }
            )
        }

        if (link.length > 2048) {
            return res.status(400).json({
                message: "URL is too long"
            })
        }
 
        const code = generateCode();

        const newLink = await linkModel.create({
            originalURL: link,
            shortCode: code,
        })

        return res.status(201).json({
            message: "Link shortened successfully",
            newLink
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getlAllLinks = async (req, res) => {

    try {
        
        const links = await linkModel.find();

        if (!links) {
            return res.status(404).json({
                message: "No links found."
            })
        }

        return res.status(200).json({
            message: "Links fetched successfully",
            links
        }
        )

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}