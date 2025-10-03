[![Actions Status](https://github.com/Freemason-EAG/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Freemason-EAG/frontend-project-46/actions) [![my-project-ci](https://github.com/Freemason-EAG/frontend-project-46/actions/workflows/my-project-ci.yml/badge.svg)](https://github.com/Freemason-EAG/frontend-project-46/actions/workflows/my-project-ci.yml) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Freemason-EAG_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Freemason-EAG_frontend-project-46) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Freemason-EAG_frontend-project-46&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Freemason-EAG_frontend-project-46)

## Gendiff

**Gendiff** — a utility for comparing two configuration files and displaying their differences.

### Supported formats

- JSON
- YAML

### Output formats

- stylish (default)
- plain
- json

### Installation
```bash
git clone https://github.com/Freemason-EAG/frontend-project-46
cd frontend-project-46
npm install
npm link
```

## How to use

gendiff <path_to_first_file> <path_to_second_file> [--format <format>]

| Options | Description |
|---------|-------------|
| `-V, --version` | output the version number |
| `-f, --format [type]` | output format (default: "stylish") |
| `-h, --help` | display help for command |
 

### Demo 

#### Comparing Two JSON Files 
[▶️ Watch Demo](https://asciinema.org/a/mGebINwCBop2DlN5F04NH0b5Q) 

#### Comparing Two YAML Files 
[▶️ Watch Demo](https://asciinema.org/a/cIB4kiMWPfTkV9EYP1xeKg4rJ)

#### Recursive file diff
[▶️ Watch Demo](https://asciinema.org/a/D2CueuI9GO5wB5wx4pIbizmw0)

#### Flat format output
[▶️ Watch Demo](https://asciinema.org/a/GPIKZPVH5Fk2rJ2tdAw3wpTNZ)

#### JSON format output
[▶️ Watch Demo](https://asciinema.org/a/AcNJW4CO3fQFROx8N2TCZ5EpX)



<!-- #### Comparing Two JSON Files
<a href="https://asciinema.org/a/mGebINwCBop2DlN5F04NH0b5Q">
    <img src="https://asciinema.org/a/mGebINwCBop2DlN5F04NH0b5Q.png" width="300" alt="Demo: Comparing Two JSON Files">
</a>

#### Comparing Two YAML Files
<a href="https://asciinema.org/a/cIB4kiMWPfTkV9EYP1xeKg4rJ">
    <img src="https://asciinema.org/a/cIB4kiMWPfTkV9EYP1xeKg4rJ.png" width="300" alt="Demo: Comparing Two YAML Files">
</a>












