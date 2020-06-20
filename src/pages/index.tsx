import * as React from 'react'

import Dropzone from 'react-dropzone'
import styled from '@emotion/styled'

import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

async function handleFiles(files: File[]): Promise<void> {
  const texts = await Promise.all(files.map(file => file.text()))
  const newTexts = texts.map(text => text.replace(/[（(][ぁ-ん]*[)）]/g, ''))
  const zip = new JSZip()
  newTexts.forEach((text, index) => {
    zip.file(files[index].name, text)
  })
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'output.zip')
}

const DropzoneContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>ようこそ</h1>
        <p>Upload some subtitle files, this tool will remove furigana from each one and pack everything into a zip file.</p>
        <Dropzone onDrop={handleFiles}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <DropzoneContainer {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
              </DropzoneContainer>
            </section>
          )}
        </Dropzone>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
