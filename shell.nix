{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  shellHook = ''
    echo "Development environment loaded"
  '';
  packages = with pkgs; [
    nodejs_22
    yarn
    pnpm
    typescript
    nodePackages.typescript-language-server
    nodePackages.prettier
  ];
}
