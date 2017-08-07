(function() {
    angular
        .module("blogApp", [])
        .controller("blogController", blogController);

    function blogController($scope, $http) {
        $scope.createPost = createPost;
        $scope.deletePost = deletePost;
        $scope.editPost = editPost;
        $scope.updatePost = updatePost;

        function init() {
            getAllPosts();
        }
        init();

        function updatePost(post) {
            $http.put("/api/blogpost/" + post._id, post).then(
                function(success) {
                    getAllPosts();
                    $scope.post = {};
                },

                function(error) {
                    return alert("Post must be created before it can be updated");
                })
        }

        function editPost(postId) {
            $http
                .get("/api/blogpost/" + postId)
                .then(function(post) {
                        $scope.post = post.data;
                    },
                    function(error) {
                        //$scope.post = "Error getting posts for editing";
                    })

        }

        function deletePost(postId) {
            $http.delete("/api/blogpost/" + postId)
                .then(
                    getAllPosts(),
                    function(error) {
                        return "Error deleting post;"
                    }
                )
        }


        function getAllPosts() {
            $http
                .get("/api/blogpost")
                .then(function(posts) {
                        $scope.posts = posts;
                    },
                    function(error) {
                        $scope.posts = "Error getting posts";
                    })
        }


        function createPost(post) {
            console.log("server" + post);
            $http
                .post("/api/blogpost", post)
                .then(
                    getAllPosts(),
                    function(error) {
                        return "Error Submitting Posts";
                    }
                )
        }
    }
})();