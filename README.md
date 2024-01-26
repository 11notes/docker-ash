# Alpine :: Ash Binaries
![size](https://img.shields.io/docker/image-size/11notes/ash/amd64-0.1.0?color=0eb305) ![version](https://img.shields.io/docker/v/11notes/ash/amd64-0.1.0?color=eb7a09) ![pulls](https://img.shields.io/docker/pulls/11notes/ash?color=2b75d6) ![activity](https://img.shields.io/github/commit-activity/m/11notes/docker-ash?color=c91cb8) ![commit-last](https://img.shields.io/github/last-commit/11notes/docker-ash?color=c91cb8)

Run Ash Binaries based on Alpine Linux. Small, lightweight, secure and fast 🏔️

## Description
What can I do with this? It will expose binaries via web a simple web API, so you can use your favourite unix/linux binaries via curl.

## Run
```shell
docker run --name ash \
  -d 11notes/ash:[tag]
```

## Defaults
| Parameter | Value | Description |
| --- | --- | --- |
| `user` | docker | user docker |
| `uid` | 1000 | user id 1000 |
| `gid` | 1000 | group id 1000 |
| `home` | /node | home directory of user docker |
| `api` | https://${IP}:8443 | HTTPS endpoint of Docker registry |

## Environment
| Parameter | Value | Default |
| --- | --- | --- |
| `TZ` | [Time Zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) | |
| `DEBUG` | Show debug information | |
| `PORT` | express server port (SSL/TLS) | 8443 |

## Parent image
* [11notes/node:stable](https://hub.docker.com/r/11notes/node)

## Built with (thanks to)
* [npm::express](https://www.npmjs.com/package/express)
* [nodejs](https://nodejs.org/en)
* [Alpine Linux](https://alpinelinux.org)

## Tips
* Only use rootless container runtime (podman, rootless docker)
* Don't bind to ports < 1024 (requires root), use NAT/reverse proxy (haproxy, traefik, nginx)