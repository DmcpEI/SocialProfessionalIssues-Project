const express = require('express');
const router = express.Router();
const Hotel = require('../../models/Hotel')

router.use(express.json());

const hotelArray = ["The Luxury Collection Hotels & Resorts", "Marriott", "Regency Hotel", "Hilton Walt Disney World", "Disney’s Wilderness Lodge", "Disney’s Yacht Club Resort", "Mandarin Oriental", "Four Seasons Hotel", "Residence Inn by Marriott", "El Rancho Casino", "Clarion Hotel and Casino", "Continental Hotel and Casino", "Cosmopolitan of Las Vegas", "Waldorf Astoria Hotels & Resorts", "Ritz Plaza Hotel", "W Hotel", "Yosemite Lodge at the Falls", "St Regis Hotels", "Hyatt", "DuPont Plaza Hotel", "Antlers Hilton Hotel", "The Stanley Hotel", "Hotel Bond", "Hollywood Plaza Hotel", "Fort Harrison Hotel", "Ahwahnee Hotel", "Belmond", "Rosewood Hotels & Resorts", "Aman Resorts", "The Peninsula Chicago", "Ritz-Carlton Hotel", "National Exchange Hotel"]
const streetNames = ["Maple Avenue", "Elm Street", "Oak Lane", "Cedar Road", "Pine Street", "Birch Avenue", "Willow Lane", "Cherry Street", "Walnut Avenue", "Chestnut Road", "Spruce Lane", "Juniper Street", "Magnolia Avenue", "Sycamore Lane", "Hawthorn Road", "Aspen Street", "Cypress Avenue", "Poplar Lane", "Mulberry Street", "Alder Road", "Hickory Lane", "Redwood Avenue", "Beech Street", "Dogwood Lane", "Yew Road", "Linden Avenue", "Ash Street", "Fir Lane", "Pinecone Road", "Sequoia Street", "Hawthorn Avenue", "Cedarwood Lane", "Birchwood Street", "Willowbrook Avenue", "Maplewood Road", "Elmwood Lane", "Chestnut Grove Street", "Sycamore Heights Avenue", "Redwood Ridge Road", "Juniper Meadows Lane", "Cherry Blossom Street", "Magnolia Terrace Avenue", "Birch Hill Lane", "Oakwood Estates Road", "Walnut Grove Street", "Pinebrook Lane", "Cedar Ridge Avenue", "Willow Creek Road", "Maple Leaf Lane", "Elmwood Park Street", "Oakhurst Lane", "Birchwood Heights Avenue", "Cherrywood Meadows Road", "Walnut Grove Lane", "Pinecrest Avenue", "Sycamore Hill Road", "Cedarwood Terrace", "Maplewood Ridge Lane", "Elmwood Springs Avenue", "Oakwood Heights Road", "Chestnut Grove Lane", "Willowbrook Heights Street", "Pinebrook Meadows Lane", "Birch Hill Gardens Avenue", "Cherry Blossom Terrace", "Walnut Grove Park Lane", "Redwood Ridge Heights", "Juniper Meadows Grove", "Magnolia Terrace Lane", "Sycamore Heights Gardens", "Cedar Ridge View", "Maple Leaf Springs", "Elmwood Park Gardens", "Oakhurst Heights Lane", "Birchwood Heights View", "Cherrywood Meadows Springs", "Walnut Grove Crest", "Pinecrest Terrace", "Sycamore Hill View", "Cedarwood Grove", "Maplewood Ridge Springs", "Elmwood Springs Gardens", "Oakwood Heights Crest", "Chestnut Grove View", "Willowbrook Heights Terrace", "Pinebrook Meadows Crest", "Birch Hill Gardens View", "Cherry Blossom Gardens Springs", "Walnut Grove Park Terrace", "Redwood Ridge View", "Juniper Meadows Terrace", "Magnolia Terrace Grove", "Sycamore Heights Crest", "Cedar Ridge Gardens", "Maple Leaf Springs View", "Elmwood Park View", "Oakhurst Heights Springs", "Birchwood Heights Crest", "Cherrywood Meadows View", "Walnut Grove Heights"]

router.get('/:country/:price', async (req, res) => {
    const hotel = new Hotel({
        name: hotelArray.at(Math.random() * 31 + 1),
        address: streetNames.at(Math.random() * 100 + 1) + " " + Math.floor(Math.random() * 150 + 1) + " "+ req.params.country,
        price: req.params.price,
        numberOfStars: Math.floor( Math.random() * 5 + 1),
        description: ""
    });
    res.status(200).json(hotel);
});

module.exports = router;