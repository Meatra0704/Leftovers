#!/usr/bin/env bash

# View port defaults to 320px 1440px with font-size: 10px as base.
# Usage: ./clamp.sh [min-size] [max-size] [min-viewport] [max-viewport] [base]

smin="${1:-16}"
smax="${2:-48}"
vmin="${3:-320}"
vmax="${4:-1440}"
base="${5:-10}"

result=$(awk -v vmin="$vmin" -v vmax="$vmax" -v smin="$smin" -v smax="$smax" -v b="$base" 'BEGIN {
  slope = (smax - smin) / (vmax - vmin)
  intercept_rem = (smin - (slope * vmin)) / b
  slope_vw = slope * 100
  printf "clamp(%.2frem, %.3frem + %.3fvw, %.2frem)", smin/b, intercept_rem, slope_vw, smax/b
}')

copy_to_clipboard() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        pbcopy
    elif [[ -n "$WSL_DISTRO_NAME" ]] || grep -qi microsoft /proc/version 2>/dev/null; then
        # WSL
        clip.exe
    elif [[ -n "$WAYLAND_DISPLAY" ]]; then
        # Wayland
        wl-copy
    else
        echo " [Warning: Unrecognized clipboard environment]" >&2
        return 1
    fi
}

echo -n "$result" | copy_to_clipboard

if [ $? -eq 0 ]; then
    echo "$result (Copied to clipboard)"
else
    echo "$result"
fi
