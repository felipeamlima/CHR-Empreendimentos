#!/usr/bin/env bash
# Extract floor plans from G:\ LANÇADOS to public/plants/<slug>/
# Detects plant files by filename keywords (case-insensitive):
#   TIPO, COB, COBERTURA, PRIV, PRIVATIVO, PLANTA, APTO, APARTAMENTO, QUARTOS
# Excludes FACHADA, WhatsApp, 360, .pdf, .jpeg.crdownload
set -euo pipefail

SRC_BASE="G:/Drives compartilhados/Empreendimentos CHR/LANÇADOS"
DST_BASE="C:/Antigravity Projects/chr-web/public/plants"

# Mode: "dry-run" (default) just prints what would be copied; "copy" actually copies.
MODE="${1:-dry-run}"

# G:\ folder name keyword → gallery slug
# Match by unique substring (case-insensitive)
declare -A MAP=(
  ["Efigênia de Freitas"]="efigenia-de-freitas"
  ["Maria das Dores Brandão"]="maria-das-dores-brandao"
  ["João Ayres"]="joao-ayres"
  ["Waldir Chaves"]="waldir-chaves"
  ["Getúlio Vargas"]="getulio-vargas"
  ["Mem de Sá"]="mem-de-sa"
  ["Stela de Souza - 514"]="stela-de-souza2"
  ["Dona Cleonice"]="dona-cleonice"
  ["Nelson Souza"]="nelson-souza"
  ["Itabira"]="itabira"
  ["Rua Macedo"]="macedo"
  ["Adelson Pazzini"]="adelson-pazzini"
  ["Dona Anisia"]="dona-anisia"
  ["Iracema Drumond"]="iracema-drummond"
  ["Itajuba 1350"]="itajuba"
  ["Caldeira Brant 70"]="caldeira-brant"
  ["Geraldo Rezende"]="geraldo-rezende"
  ["Marechal Hermes"]="marechal-hermes"
  ["São Roque"]="sao-roque"
  ["Arnaldo Xavier"]="arnaldo-xavier"
  ["Jardins do Prado"]="jardins-do-prado"
  ["Machado Lima"]="machado-lima"
  ["Francisco Bressane 119"]="francisco-bressane"
  ["Amaro Lanari"]="amaro-linari"
  ["Dom Vital"]="dom-vital"
  ["Chicago"]="chicago"
  ["Mestre Luiz"]="sao-pedro"
  ["Isabela lima"]="isabela-lima"
  ["Enio Soares"]="enio-soares"
  ["Gisa Araujo"]="gisa-araujo"
  ["São Manoel 263"]="sao-manoel"
  ["Silvestre Ferraz"]="silvestre-ferraz"
  ["Barão de Cocais"]="barao-de-cocais"
  ["Costa Monteiro"]="costa-monteiro"
  ["Odilon Braga"]="odilon-braga"
  ["Stela de Souza 107"]="stela-de-souza"
  ["Mar de Espanha"]="mar-de-espanha"
  ["Major Lopes"]="major-lopes"
  ["Maranhão 1427"]="maranhao"
  ["E-Pinheiro"]="sao-domingos"
  ["J. Silva"]="j-silva"
  ["Aimorés"]="aimores"
  ["M. Faria"]="m-faria"
  ["Silva Jardim 192"]="silva-jardim"
  ["Sion Prime Living"]="sion-prime"
)

# Plant file matcher
is_plant() {
  local name="$1"
  shopt -s nocasematch
  # Hard exclusions (renders / non-plant files)
  if [[ "$name" =~ \.pdf$ ]] ||
     [[ "$name" =~ FACHADA ]] ||
     [[ "$name" =~ WhatsApp ]] ||
     [[ "$name" =~ 360 ]] ||
     [[ "$name" =~ ^Tabela ]] ||
     [[ "$name" =~ ^Sala ]] ||
     [[ "$name" =~ ^SALA ]] ||
     [[ "$name" =~ \ Sala\  ]] ||
     [[ "$name" =~ ^Terraço ]] ||
     [[ "$name" =~ ^TERRAÇO ]] ||
     [[ "$name" =~ ^Terraco ]] ||
     [[ "$name" =~ ^TERRACO ]] ||
     [[ "$name" =~ ^Quarto\  ]] ||
     [[ "$name" =~ ^QUARTO\  ]] ||
     [[ "$name" =~ ^Sala\  ]]; then
    shopt -u nocasematch
    return 1
  fi
  # Inclusions
  if [[ "$name" =~ TIPO ]] ||
     [[ "$name" =~ COB ]] ||
     [[ "$name" =~ COBERTURA ]] ||
     [[ "$name" =~ PRIV ]] ||
     [[ "$name" =~ PRIVATIVO ]] ||
     [[ "$name" =~ PRIVATIVA ]] ||
     [[ "$name" =~ PLANTA ]] ||
     [[ "$name" =~ APTO ]] ||
     [[ "$name" =~ APARTAMENTO ]] ||
     [[ "$name" =~ QUARTOS ]] ||
     [[ "$name" =~ IMPLANTA ]]; then
    shopt -u nocasematch
    return 0
  fi
  shopt -u nocasematch
  return 1
}

find_slug() {
  local folder="$1"
  for key in "${!MAP[@]}"; do
    if [[ "$folder" == *"$key"* ]]; then
      echo "${MAP[$key]}"
      return 0
    fi
  done
  echo ""
  return 1
}

echo "=========================================="
echo "  EXTRACT PLANTS  ·  mode: $MODE"
echo "=========================================="
echo ""

total_copied=0
total_skipped=0
unmatched_folders=()

for dir in "$SRC_BASE"/*/; do
  folder=$(basename "$dir")
  slug=$(find_slug "$folder")

  if [[ -z "$slug" ]]; then
    unmatched_folders+=("$folder")
    continue
  fi

  # Collect plant files (sorted)
  plants=()
  while IFS= read -r -d '' file; do
    base=$(basename "$file")
    if is_plant "$base"; then
      plants+=("$file")
    fi
  done < <(find "$dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | sort -z)

  if [[ ${#plants[@]} -eq 0 ]]; then
    echo "[skip] $slug  (no plants found in '$folder')"
    continue
  fi

  echo "[$slug]  ${#plants[@]} plant(s)  ←  $folder"

  dst_dir="$DST_BASE/$slug"

  if [[ "$MODE" == "copy" ]]; then
    mkdir -p "$dst_dir"
    # Clear existing
    rm -f "$dst_dir"/*.jpg "$dst_dir"/*.jpeg "$dst_dir"/*.png 2>/dev/null || true
  fi

  i=1
  for src in "${plants[@]}"; do
    ext="jpg" # normalise to jpg
    base=$(basename "$src")
    case "$base" in
      *.png|*.PNG) ext="png" ;;
    esac
    dst="$dst_dir/$i.$ext"
    if [[ "$MODE" == "copy" ]]; then
      cp -f "$src" "$dst"
    fi
    echo "    $i.$ext  ←  $base"
    i=$((i+1))
    total_copied=$((total_copied+1))
  done
done

echo ""
echo "=========================================="
echo "  TOTAL: $total_copied plant file(s) ${MODE/copy/copied}"
echo "=========================================="

if [[ ${#unmatched_folders[@]} -gt 0 ]]; then
  echo ""
  echo "UNMATCHED FOLDERS (review the MAP):"
  for f in "${unmatched_folders[@]}"; do
    echo "  - $f"
  done
fi
