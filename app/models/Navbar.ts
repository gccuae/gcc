import mongoose from "mongoose";

const navbarSchema = new mongoose.Schema({
    navSection: {
        items: [
            {
                title: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                },
                subItems: [
                    {
                        id: {
                            type: String
                        },
                        title: {
                            type: String
                        },
                        url: {
                            type: String
                        },
                    }
                ]
            }
        ]
    }

});

export default mongoose.models.Navbar || mongoose.model("Navbar", navbarSchema);
