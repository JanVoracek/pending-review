const GitHubApi = require('github');
const argv = require('minimist')(process.argv.slice(2));

require('dotenv').config();

const user = argv.user || process.env.USER;
const owner = argv.org || process.env.ORGANIZATION;
const token = argv.token || process.env.PERSONAL_ACCESS_TOKEN;

const github = new GitHubApi({
    headers: {
        "user-agent": "VersionPress Review Checker" // GitHub is happy with a unique user agent
    }
});

github.authenticate({
    type: "token",
    token: token,
});


function printPullRequests(pullRequests, owner, repo) {
    console.log(`${owner}/${repo}:`);

    for (let pull of pullRequests) {
        console.log(`#${pull.number} (${pull.html_url}): ${pull.title}`);
    }

    console.log();
}

let pendingReview = '- [ ] @' + user;
github.repos.getForOrg({org: 'versionpress'}, (err, repos) => {
    repos.forEach(repo => {
        github.pullRequests.getAll({
            owner,
            repo: repo.name,
            state: 'open',
            per_page: 100
        }, (err, pullRequests) => {
            let pullRequestsWithPendingReview = pullRequests.filter(pull => {
                return pull.body.toLowerCase().indexOf(pendingReview.toLowerCase()) >= 0
            });

            if (pullRequestsWithPendingReview.length > 0) {
                printPullRequests(pullRequestsWithPendingReview, owner, repo.name);
            }
        });
    });
});
