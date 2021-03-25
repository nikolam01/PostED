const posts = [{
        _id: 1,
        author: "Nikola",
        text: "Hello there",
        createdAt: new Date(),
        commentsNumber: 2,
        comments: [


            {
                author: "Pera",
                text: "Hej i tebi",
                createdAt: new Date(),

            },

            {
                author: "Mika",
                text: "Hej tamo",
                createdAt: new Date(),

            }


        ],

    },
    {
        _id: 2,
        author: "Pera",
        text: "Hello there 2",
        createdAt: new Date(),
        commentsNumber: 1,
        comments: [


            {
                author: "Pera",
                text: "Hej i tebi 2",
                createdAt: new Date(),

            }
        ],

    }
];

function getAllPosts() {
    return posts;
}

function addNewPost(newPost) {
    posts.unshift(newPost);
}

module.exports = { getAllPosts, addNewPost };