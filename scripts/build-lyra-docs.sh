#!/usr/bin/env bash
# Builds the documentation site from lyra-org/lyra-docs with the `/docs/` base,
# then copies the output to the given directory.
#
# Usage: scripts/build-lyra-docs.sh <out-dir>
#
# Environment variables:
# - LYRA_DOCS_DIR: existing checkout to build, cloned when missing (default: lyra-docs)
# - LYRA_DOCS_REF: branch or tag to clone (default: main)
# - LYRA_VERSION: version shown in the docs navbar (default: version in package.json)
#
# NOTICE: the page changelogs are generated from Git history. The clone here is
# shallow, so a full history checkout must be passed in through LYRA_DOCS_DIR
# when the changelogs matter, as the production deploy workflow does.
set -euo pipefail

out_dir="${1:?usage: scripts/build-lyra-docs.sh <out-dir>}"
docs_dir="${LYRA_DOCS_DIR:-lyra-docs}"

if [ ! -d "$docs_dir/.git" ]; then
  git clone --depth 1 --branch "${LYRA_DOCS_REF:-main}" https://github.com/lyra-org/lyra-docs.git "$docs_dir"
fi

LYRA_VERSION="${LYRA_VERSION:-$(node -p "require('./package.json').version")}"
export LYRA_VERSION

pnpm -C "$docs_dir" install --frozen-lockfile
pnpm -C "$docs_dir" run build:base

rm -rf "$out_dir"
mkdir -p "$(dirname "$out_dir")"
cp -R "$docs_dir/.vitepress/dist" "$out_dir"
