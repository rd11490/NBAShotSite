
## Recommended preamble for including this script:
#
# . "$(dirname "${BASH_SOURCE[0]}")/common.sh"

set -o nounset -o errexit -o pipefail

# Directory where shell scripts are stored.
export SCRIPTS="$(dirname "${BASH_SOURCE[0]}")"

# Directory where the jar is deployed.
export DIR="$( (cd $SCRIPTS/..; pwd) )"

# Russell.jar that is actually launched. Will differ from

export JAR="$DIR/nbashotcompare/target/scala-2.12/NBA_Shot_Compare.jar
"