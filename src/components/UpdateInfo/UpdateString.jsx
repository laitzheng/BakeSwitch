import React, { useState, useRef } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import styles from "./UpdateInfo.module.css";

export default function UpdateString(props) {
	const item = props.item;
	const field = props.field;
	const docRef = props.docRef;

	const [updateItem, setUpdateItem] = useState(false);
	const [loading, setLoading] = useState(false);
	const newVal = useRef();

	function handleUpdate(event) {
		event.preventDefault;
		setLoading(true);
		setUpdateItem(false);
		try {
			docRef
				.update({ [field]: newVal.current.value })
				.then(() => alert("Successfully updated. Refresh the page to view changes."));
		} catch (err) {
			alert("" + err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<IconButton aria-label="edit details" onClick={() => setUpdateItem(!updateItem)}>
				{item ? <EditIcon /> : <AddIcon />}
			</IconButton>

			{updateItem && (
				<Form onSubmit={handleUpdate}>
					<Form.Group className={styles.editString}>
						<InputGroup className="mb-2">
							<Form.Control type="text" placeholder="Type here" ref={newVal} required />
							<Button disabled={loading} type="submit">
								Update
							</Button>
						</InputGroup>
					</Form.Group>
				</Form>
			)}
		</div>
	);
}