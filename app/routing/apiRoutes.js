var friends = require("../data/friends");
//routing

module.exports = function(app) {
  //get requests
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  //post requests
  app.post("/api/friends", function(req, res) {
  // hold best match and loop through all of the options
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    // users servey POSt and Parse it
    var userData = req.body;
    var userScores = userData.scores;
    // var to calculate diff in user score and database user.
    var totalDifference;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      // loop through all the scores of each friend
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    friends.push(userData);

    res.json(bestMatch);
  });
};
