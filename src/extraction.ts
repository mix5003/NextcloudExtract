import {
    DefaultType,
    FileAction,
    type Node,
    Permission,
    registerFileAction
} from '@nextcloud/files';
import {
    generateUrl,
    generateFilePath
} from '@nextcloud/router';

const types = {
    zip: ['application/zip', ],
    rar: ['application/x-rar-compressed'],
    // TAR
    //'application/x-tar', 'application/x-7z-compressed'
    other: ['application/x-tar', 'application/x-7z-compressed', 'application/x-bzip2', 'application/x-deb', 'application/x-gzip', 'application/x-compressed'],
};

function actionHandler(type: string, file: Node, dir: string) {
    return new Promise < boolean > ((resolve) => {
        var data = {
            nameOfFile: file.basename,
            directory: dir,
            external: 0,
            type: type,
        };
        $.ajax({
            type: "POST",
            url: generateFilePath('extract', 'ajax', 'extract.php'),
            data: data,
            success: function(response) {
                if (response.code === 1) {
                    // context.fileList.reload();
                    resolve(true);
                } else {
                    alert(response.desc)
                    resolve(false);
                }
            },
            error: function(e) {
                alert('error')
                resolve(false);
            },
        });
    })
}

for (const [type, mimeTypes] of Object.entries(types)) {
    registerFileAction(
        new FileAction({
            id: 'extract-' + type,
            iconSvgInline: () => '<svg></svg>',
            displayName: () => 'Extract here',
            default: DefaultType.DEFAULT,
            enabled(nodes) {
                return nodes.some((node) => mimeTypes.includes(node.mime ?? ''));
            },
            exec: async function(file, view, dir) {
                return await actionHandler(type, file, dir);
            },
        }),
    );
}