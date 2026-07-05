{
  description = "A Nix-flake-based Web development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
      ];
      forEachSupportedSystem =
        f:
        nixpkgs.lib.genAttrs supportedSystems (
          system:
          f {
            pkgs = import nixpkgs { inherit system; };
          }
        );
    in
    {
      devShells = forEachSupportedSystem (
        { pkgs }:
        {
          default = pkgs.mkShellNoCC {
            packages = with pkgs; [
              nodejs_24
              biome

              (writeShellApplication {
                name = "clamp";
                runtimeInputs = [
                  gawk
                  wl-clipboard
                ];
                text = ''
                  # View port faults to 320px 1440px with font-size: 10px as base.
                  # Usage: clamp [min-size] [max-size] [min-viewport] [max-viewport]
                  smin="''${1:-16}"
                  smax="''${2:-48}"
                  vmin="''${3:-320}"
                  vmax="''${4:-1440}"
                  base="''${5:-10}"

                  result=$(awk -v vmin="$vmin" -v vmax="$vmax" -v smin="$smin" -v smax="$smax" -v b="$base" 'BEGIN {
                    slope = (smax - smin) / (vmax - vmin)
                    intercept_rem = (smin - (slope * vmin)) / b
                    slope_vw = slope * 100
                    printf "clamp(%.2frem, %.3frem + %.3fvw, %.2frem)", smin/b, intercept_rem, slope_vw, smax/b
                  }')

                  echo "$result (Copied to clipboard)"
                  echo "$result" | wl-copy
                '';
              })
            ];

            shellHook = ''
              echo "Web Development Environment loaded."
            '';
          };
        }
      );
    };
}
