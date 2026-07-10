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
            inherit system;
          }
        );
    in
    {
      packages = forEachSupportedSystem (
        { pkgs, ... }:
        {
          default = pkgs.buildNpmPackage {
            pname = "leftovers";
            version = "1.0.0";
            src = ./.;
            npmDepsHash = "sha256-VeyhCjO4Px800xGF4oN0KCvwax+wLUG/lUmXxsZy734=";
            buildInputs = [ pkgs.nodejs_24 ];
            buildPhase = ''
              npm run build -- --base=/
            '';

            installPhase = ''
              mkdir -p $out/bin $out/share/leftovers
              cp -r dist/* $out/share/leftovers/

              cat > $out/bin/leftovers <<EOF
              #!${pkgs.bash}/bin/bash
              exec ${pkgs.serve}/bin/serve -s $out/share/leftovers -l 3000
              EOF
              chmod +x $out/bin/leftovers
            '';
          };
        }
      );

      apps = forEachSupportedSystem (
        { system, ... }:
        {
          default = {
            type = "app";
            program = "${self.packages.${system}.default}/bin/leftovers";
          };
        }
      );

      devShells = forEachSupportedSystem (
        { pkgs, ... }:
        {
          default = pkgs.mkShellNoCC {
            packages = with pkgs; [
              nodejs_24
              biome

              typst
              tinymist

              (writeShellApplication {
                name = "clamp";
                runtimeInputs = [
                  gawk
                  wl-clipboard
                ];
                text = builtins.readFile ./scripts/clamp.sh;
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
