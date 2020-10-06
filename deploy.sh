#!/usr/bin/env sh

set -e

# staging or production?
BUCKET="dev"
while [ "$1" != "" ]; do
	case $1 in
		--staging )
			shift
			BUCKET="dev"
			;;

		--production )
			shift
			BUCKET="master"
			;;

		* ) shift;;
	esac
done

echo "Deploying to $BUCKET ..."

CDN_AUTH=$(echo $CDN_AUTH | base64 -D)

CDN_SPACE="gs://labs-www-gannett-cdn-com/labs/$BUCKET"
PUBLIC_PATH="https://www.gannett-cdn.com/labs/$BUCKET"
CDN_PATH="https://$CDN_AUTH@www.gannett-cdn.com/labs/$BUCKET"

PROJECT_SLUG="$(basename $(pwd))"
PROJECT_FOLDER="./public"

# You could put a build step or steps here.
# GIT_BRANCH=$bucket npm run build

gsutil -m rsync -r $PROJECT_FOLDER "$CDN_SPACE/$PROJECT_SLUG"

for filename in $(cd $PROJECT_FOLDER && find *); do
	echo "$CDN_PATH/$PROJECT_SLUG/$filename" 
	curl -X PURGE "$CDN_PATH/$PROJECT_SLUG/$filename" &
done

#curl -X PURGE "$CDN_PATH/$PROJECT_SLUG/index.html" -m 10 &

# Add AllUsers:R to the project folder
gsutil -m acl ch -u AllUsers:R  -r "$CDN_SPACE/$PROJECT_SLUG"

wait
echo "Deployed:"
echo "$PUBLIC_PATH/$PROJECT_SLUG"
