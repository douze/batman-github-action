# Batman GitHub Action

![github](https://img.shields.io/badge/-GitHub-grey?logo=GitHub&logoColor=white)
![license](https://img.shields.io/github/license/douze/batman-github-action?color=blue&label=license)
![continuous integration](https://img.shields.io/github/actions/workflow/status/douze/batman-github-action/continuous-integration.yml)
![coverage](.github/coverage.svg)
![lint](.github/lint.svg)


**Batman** is a **GitHub Action** used to update your profile README. Depending on your commit history dates, it'll output Batman or BruceWayne.

This project is mainly used to discover GitHub action & API.

[comment]: <> (Include preview image like other repos ?)

## Inputs

### `username_id`
**Required** The ID of the GitHub user.

### `day_start`
**Required** Hour of the day start.

### `day_end`
**Required** Hour of the day end.

### `github_token`
The GitHub access token.

## Outputs

Updated profile README, with circle svg & identity (Batman or BruceWayne).

## Example usage

```yaml
uses: douze/batman-github-action@v1.1
with:
    username_id: 'douze'
    day_start: '8'
    day_end: '18'
```