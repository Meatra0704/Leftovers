#!/usr/bin/env bash

# View port defaults to 320px 1440px with font-size: 10px as base.
# Usage: ./clamp.sh [min-size] [max-size] [min-viewport] [max-viewport] [base]

smin="${1:-16}"
smax="${2:-48}"
vmin="${3:-320}"
vmax="${4:-1440}"
base="${5:-10}"

# get_token replaces input [min-size] and [max-size] values with tokens based
# on ../src/styles/global.css
get_token() {
    local px=$1
    local b=$2
    case "$px" in
        4)  echo "var(--space-xs)" ;;
        8)  echo "var(--space-sm)" ;;
        16) echo "var(--space-md)" ;;
        24) echo "var(--space-lg)" ;;
        32) echo "var(--space-xl)" ;;
        48) echo "var(--space-xxl)" ;;
        64) echo "var(--space-xxxl)" ;;
        *)  awk -v p="$px" -v b="$b" 'BEGIN { printf "%.2frem", p/b }' ;;
    esac
}

min_val=$(get_token "$smin" "$base")
max_val=$(get_token "$smax" "$base")
preferred_val=$(awk -v vmin="$vmin" -v vmax="$vmax" -v smin="$smin" -v smax="$smax" -v b="$base" 'BEGIN {
    slope = (smax - smin) / (vmax - vmin)
    intercept_rem = (smin - (slope * vmin)) / b
    slope_vw = slope * 100
    printf "%.3frem + %.3fvw", intercept_rem, slope_vw
}')

result="clamp(${min_val}, ${preferred_val}, ${max_val})"

copy_to_clipboard() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        pbcopy
    elif [[ -n "${WSL_DISTRO_NAME:-}" ]] || grep -qi microsoft /proc/version 2>/dev/null; then
        clip.exe
    elif [[ -n "${WAYLAND_DISPLAY:-}" ]]; then
        wl-copy
    else
        echo " [Warning: Unrecognized clipboard environment]" >&2
        return 1
    fi
}

if echo -n "$result" | copy_to_clipboard; then
    echo "$result (Copied to clipboard)"
else
    echo "$result"
fi
